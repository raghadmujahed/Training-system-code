<?php

namespace App\Http\Controllers;

use App\Services\BackupService;

class BackupController extends Controller
{
    public function store(BackupService $service)
    {
        return $service->createDatabaseBackup();
    }
}