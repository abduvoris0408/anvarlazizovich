// Practice areas data
export interface PracticeArea {
  id: string
  title: string
  description: string
  icon: string
  details: string[]
}

export const practiceAreas: PracticeArea[] = [
  {
    id: "civil-law",
    title: "Fuqarolik huquqi",
    description: "Fuqarolik huquqiy munosabatlardan kelib chiqadigan nizolarni hal qilish va huquqiy maslahatlar.",
    icon: "Scale",
    details: [
      "Mulkiy nizolarni hal qilish",
      "Shartnomaviy munosabatlar",
      "Zarar qoplanishi bo'yicha da'volar",
      "Meros ishlari",
    ],
  },
  {
    id: "criminal-law",
    title: "Jinoyat huquqi",
    description: "Jinoyat ishlarida himoya va huquqiy yordam ko'rsatish.",
    icon: "Shield",
    details: [
      "Jinoyat ishlarida himoya",
      "Sud jarayonlarida ishtirok",
      "Ayblovlarni rad etish",
      "Jinoiy javobgarlikni yengillashtirish",
    ],
  },
  {
    id: "family-law",
    title: "Oilaviy nizolar",
    description: "Oilaviy munosabatlardan kelib chiqadigan nizolarni hal qilish.",
    icon: "Heart",
    details: [
      "Nikohni bekor qilish ishlari",
      "Bolalar tarbiyasi masalalari",
      "Alimentlar to'g'risidagi ishlar",
      "Mol-mulkni bo'lish",
    ],
  },
  {
    id: "labor-law",
    title: "Mehnat huquqi",
    description: "Mehnat munosabatlari sohasida huquqiy himoya va maslahatlar.",
    icon: "Briefcase",
    details: [
      "Mehnat shartnomasi nizolari",
      "Noqonuniy ishdan bo'shatish",
      "Ish haqi masalalari",
      "Mehnat huquqlari himoyasi",
    ],
  },
  {
    id: "business-law",
    title: "Biznes va shartnomalar",
    description: "Biznes yuritish va shartnomaviy munosabatlar bo'yicha huquqiy yordam.",
    icon: "Building",
    details: [
      "Biznes shartnomalarni tuzish",
      "Kompaniyalarni ro'yxatdan o'tkazish",
      "Tijorat nizolarini hal qilish",
      "Huquqiy audit",
    ],
  },
]
