import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";

export default function Reports() {
  return (
    <>
      <PageHeader
        title="التقارير"
        subtitle="عرض التقارير والإحصائيات الخاصة بالنظام"
      />

      <div className="section-card">
        <EmptyState
          title="صفحة التقارير قيد التجهيز"
          description="سيتم لاحقًا إضافة تقارير الطلبة، التقييمات، التوزيع، والحضور."
        />
      </div>
    </>
  );
}