# Clinic Dashboard

وب‌اپلیکیشن فارسی و RTL برای رزرو و مدیریت نوبت‌های یک مرکز درمانی، ساخته‌شده با React + TypeScript + Vite.

## امکانات پیاده‌سازی‌شده

### مراجعه‌کننده

- ورود با ایمیل یا شماره موبایل به صورت Mock
- Dashboard و آمار نوبت‌ها
- نمایش نوبت‌های آینده و جزئیات
- مشاوران پیشنهادی
- جستجو و فیلتر مشاوران
- رزرو چهارمرحله‌ای: خدمت → مشاور → تاریخ/ساعت → تأیید
- Slotهای آزاد، رزروشده و مسدود
- نتیجه رزرو + کد پیگیری
- ساخت فایل Calendar (`.ics`)
- صفحه نوبت‌های من: همه / آینده / گذشته
- لغو نوبت
- تغییر زمان نوبت

### مشاور

- Dashboard جداگانه
- آمار نوبت‌های امروز، آینده، لغوشده و مراجعین
- مشاهده و تغییر وضعیت نوبت
- تقویم روزانه نوبت‌ها
- فعال/غیرفعال کردن روز کاری
- تعریف چند بازه ساعت کاری
- Block کردن Slot خاص

### معماری و UI

- Feature-Based Architecture
- TanStack Query برای Server State
- Zustand برای Auth و Booking Draft
- React Hook Form + Zod
- MSW برای Mock API
- Loading / Skeleton / Error / Empty / Disabled / Success States
- Sidebar در Desktop و Bottom Navigation در Mobile
- RTL و Responsive Design

## اجرا

```bash
npm install
npm run dev
```

برای Build:

```bash
npm run build
```

Mock API به صورت پیش‌فرض فعال است. برای اتصال API واقعی:

```env
VITE_USE_MOCKS=false
```

## حساب‌های تست

### مراجعه‌کننده

```text
user@gmail.com
1234
```

یا:

```text
09121234567
1234
```

### مشاور

```text
consultant@gmail.com
5678
```

یا:

```text
09120000002
5678
```

برای جزئیات ساختار پروژه فایل `ARCHITECTURE.md` را ببینید.
