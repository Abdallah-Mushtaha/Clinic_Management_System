export default function DoctorForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isPending,
  editingId,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "experience" ? parseInt(value) : value,
    });
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <input
          name="name"
          placeholder="الاسم الكامل"
          value={formData.name}
          onChange={handleChange}
          className="p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="email"
          placeholder="البريد الإلكتروني"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="specialty"
          placeholder="التخصص"
          value={formData.specialty}
          onChange={handleChange}
          className="p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="phone"
          placeholder="رقم الهاتف"
          value={formData.phone}
          onChange={handleChange}
          className="p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="experience"
          placeholder="سنوات الخبرة"
          type="number"
          value={formData.experience}
          onChange={handleChange}
          className="p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="consultationFee"
          placeholder="رسوم الاستشارة"
          value={formData.consultationFee}
          onChange={handleChange}
          className="p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <textarea
            name="education"
            placeholder="التعليم والمؤهلات..."
            value={formData.education}
            onChange={handleChange}
            className="p-4 bg-slate-50 rounded-2xl border-none min-h-[100px] outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="bio"
            placeholder="نبذة عن الطبيب..."
            value={formData.bio}
            onChange={handleChange}
            className="p-4 bg-slate-50 rounded-2xl border-none min-h-[100px] outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-3 flex justify-end gap-3">
          <button className="cursor-pointer" type="button" onClick={onCancel}>
            إلغاء
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="bg-slate-900 text-white px-12 rounded-2xl h-12 shadow-lg hover:bg-black transition-all cursor-pointer font-bold"
          >
            {editingId ? "تحديث البيانات" : "اعتماد الطبيب"}
          </button>
        </div>
      </form>
    </div>
  );
}
