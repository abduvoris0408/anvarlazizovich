// Testimonials data
export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  image: string
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Azimov Sardor",
    role: "Tadbirkor",
    content:
      "Anvar Lazizovich bizga biznes nizolarini hal qilishda katta yordam berdi. Professional yondashuv va chuqur bilim.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Karimova Dilnoza",
    role: "Ijtimoiy xodim",
    content: "Oilaviy nizolar bo'yicha maslahat oldim. Juda professional va tushunuvchi mutaxassis.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Rahmonov Bobur",
    role: "Kompaniya direktori",
    content: "Mediatsiya xizmatlari orqali nizoni tez va samarali hal qildik. Juda minnatdormiz.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Yusupova Madina",
    role: "O'qituvchi",
    content: "Mehnat huquqi bo'yicha maslahat oldim. Anvar aka barcha savollarimga batafsil javob berdi.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "5",
    name: "Toshmatov Jasur",
    role: "Tadbirkor",
    content: "Shartnomalar tuzishda professional yordam. Kelajakda ham faqat shu mutaxassisga murojaat qilaman.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "6",
    name: "Saidova Gulnora",
    role: "Buxgalter",
    content: "Jinoyat ishida himoya xizmati ko'rsatdi. Natija kutilganidan ham yaxshi bo'ldi.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
]
