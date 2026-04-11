<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBackupRequest;
use App\Http\Requests\RestoreBackupRequest;
use App\Models\Backup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BackupController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Backup::class, 'backup');
    }

    public function index(Request $request)
    {
        $backups = Backup::with('user')->latest()->paginate($request->per_page ?? 15);
        return response()->json($backups);
    }

    public function store(CreateBackupRequest $request)
    {
        // توليد اسم الملف
        $filename = 'backup_' . date('Ymd_His') . '_' . Str::random(8) . '.sql';
        $filepath = 'backups/' . $filename;
        
        // تنفيذ أمر mysqldump (تأكد من وجوده في المسار)
        $db = config('database.connections.mysql.database');
        $user = config('database.connections.mysql.username');
        $password = config('database.connections.mysql.password');
        $host = config('database.connections.mysql.host');
        
        $command = sprintf('mysqldump --user=%s --password=%s --host=%s %s > %s', 
            escapeshellarg($user), escapeshellarg($password), escapeshellarg($host), 
            escapeshellarg($db), escapeshellarg(storage_path('app/' . $filepath)));
        system($command, $output);
        
        $backup = Backup::create([
            'user_id' => $request->user()->id,
            'type' => $request->type,
            'name' => $filename,
            'file_path' => $filepath,
            'size' => Storage::exists($filepath) ? Storage::size($filepath) : 0,
            'status' => 'completed',
            'notes' => $request->notes,
        ]);
        
        return response()->json($backup, 201);
    }

    public function show(Backup $backup)
    {
        return response()->json($backup);
    }

    public function destroy(Backup $backup)
    {
        Storage::delete($backup->file_path);
        $backup->delete();
        return response()->json(['message' => 'تم حذف النسخة الاحتياطية']);
    }

    public function restore(RestoreBackupRequest $request)
    {
        $backup = Backup::findOrFail($request->backup_id);
        $filepath = storage_path('app/' . $backup->file_path);
        
        // تنفيذ استعادة (mysql)
        $db = config('database.connections.mysql.database');
        $user = config('database.connections.mysql.username');
        $password = config('database.connections.mysql.password');
        $command = sprintf('mysql --user=%s --password=%s %s < %s', 
            escapeshellarg($user), escapeshellarg($password), escapeshellarg($db), escapeshellarg($filepath));
        system($command, $output);
        
        return response()->json(['message' => 'تم استعادة النسخة الاحتياطية بنجاح']);
    }
}