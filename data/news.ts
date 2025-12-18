export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  readTime: string
  image?: string
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "new-civil-code-changes-2024",
    title: "Important Changes in the New Civil Code",
    excerpt: "Key amendments to the Civil Code in 2024 and their practical significance for citizens and businesses.",
    content: `In 2024, several important amendments were made to the Civil Code of the Republic of Uzbekistan. These changes are aimed at further strengthening the property rights of citizens.

One of the main changes is the update of norms regulating contractual relationships. The new rules simplify the procedure for concluding, amending, and terminating contracts.

Additionally, new rules on the use of electronic contracts and digital signatures have been introduced. This allows for the development of legal relationships using modern technologies.

Key highlights:
- Simplified contract procedures
- Digital signature recognition
- Enhanced property protection
- Clearer dispute resolution mechanisms`,
    date: "2024-12-15",
    category: "Legislation",
    readTime: "5 min",
  },
  {
    id: "2",
    slug: "mediation-advantages",
    title: "Advantages of Resolving Disputes Through Mediation",
    excerpt: "Why mediation can be more effective than court proceedings for resolving conflicts.",
    content: `Mediation is an alternative method of dispute resolution that helps parties reach a mutual agreement. Unlike court proceedings, mediation is faster, cheaper, and less stressful.

Main advantages of mediation:
- Time savings: Court proceedings can last for months, while mediation takes from a few days to a few weeks.
- Lower costs: Court fees and attorney fees are much higher than mediation costs.
- Confidentiality: The mediation process is conducted confidentially.
- Preserving relationships: Relationships between parties are maintained.

When to consider mediation:
- Business disputes between partners
- Employment conflicts
- Family matters
- Neighborhood disputes
- Contract disagreements`,
    date: "2024-12-10",
    category: "Mediation",
    readTime: "4 min",
  },
  {
    id: "3",
    slug: "protecting-labor-rights",
    title: "Protecting Workers' Labor Rights",
    excerpt: "What to do when your rights are violated by an employer and how to seek legal recourse.",
    content: `Labor rights are among the fundamental rights of every employee. However, in practice, there are cases of these rights being violated by employers.

Most common violations:
- Non-payment or delay of wages
- Unlawful dismissal
- Overtime work without compensation
- Violation of working conditions standards

In such cases, an employee can take the following measures to protect their rights:
1. Submit a written complaint to the employer
2. Contact the labor inspectorate
3. File a lawsuit in court

It's important to document everything and keep records of all communications with your employer.`,
    date: "2024-12-05",
    category: "Labor Law",
    readTime: "6 min",
  },
  {
    id: "4",
    slug: "business-contracts-guide",
    title: "Secrets to Properly Drafting Business Contracts",
    excerpt: "What to consider in contracts to avoid future problems and disputes.",
    content: `A properly drafted contract is the foundation of a successful business. Many disputes arise from improperly drafted or incomplete contracts.

Elements that must be present in a contract:
- Accurate details of the parties
- Subject of the contract
- Rights and obligations of the parties
- Payment terms and deadlines
- Liability measures
- Dispute resolution procedure
- Contract duration

Professional legal assistance in reviewing the contract helps avoid major problems in the future.

Best practices:
- Always get contracts reviewed by a lawyer
- Include clear termination clauses
- Define force majeure conditions
- Specify the governing law`,
    date: "2024-11-28",
    category: "Business Law",
    readTime: "7 min",
  },
  {
    id: "5",
    slug: "real-estate-transactions",
    title: "Legal Aspects of Real Estate Transactions",
    excerpt: "Essential legal considerations when buying, selling, or renting property in Uzbekistan.",
    content: `Real estate transactions are among the most significant legal and financial decisions people make. Understanding the legal framework is essential for protecting your interests.

Key considerations for buyers:
- Verify property ownership documents
- Check for any encumbrances or liens
- Ensure proper registration
- Review zoning regulations

For sellers:
- Prepare all necessary documentation
- Disclose any known defects
- Understand tax implications
- Clear any outstanding obligations

Common pitfalls to avoid:
- Incomplete due diligence
- Verbal agreements without written contracts
- Ignoring property boundaries
- Failing to verify seller's authority`,
    date: "2024-11-20",
    category: "Real Estate",
    readTime: "8 min",
  },
  {
    id: "6",
    slug: "intellectual-property-protection",
    title: "Protecting Intellectual Property Rights",
    excerpt: "How to safeguard your trademarks, patents, and copyrights in the modern business environment.",
    content: `Intellectual property (IP) protection is crucial for businesses and creators in today's knowledge-based economy. Understanding your rights and how to protect them can make a significant difference.

Types of intellectual property:
- Patents: Protect inventions and innovations
- Trademarks: Protect brand names and logos
- Copyrights: Protect creative works
- Trade secrets: Protect confidential business information

Steps to protect your IP:
1. Register your trademarks and patents
2. Use proper copyright notices
3. Implement confidentiality agreements
4. Monitor for infringement
5. Take swift action against violations

The cost of not protecting IP can far exceed the investment in proper protection.`,
    date: "2024-11-15",
    category: "IP Law",
    readTime: "6 min",
  },
  {
    id: "7",
    slug: "family-law-essentials",
    title: "Understanding Family Law: Marriage, Divorce, and Custody",
    excerpt:
      "A comprehensive guide to family law matters including marriage contracts, divorce proceedings, and child custody.",
    content: `Family law encompasses some of the most personal and emotionally charged legal matters. Having a clear understanding of your rights and obligations is essential.

Marriage:
- Legal requirements for valid marriage
- Marriage contracts and prenuptial agreements
- Property rights during marriage

Divorce:
- Grounds for divorce
- Property division
- Alimony and support obligations
- Documentation requirements

Child Custody:
- Best interests of the child standard
- Custody arrangements (joint vs. sole)
- Visitation rights
- Child support calculations

Seeking legal counsel early in family disputes can help protect your interests and, most importantly, the well-being of any children involved.`,
    date: "2024-11-08",
    category: "Family Law",
    readTime: "9 min",
  },
  {
    id: "8",
    slug: "corporate-governance-best-practices",
    title: "Corporate Governance Best Practices for Modern Businesses",
    excerpt: "How to establish effective corporate governance structures that ensure compliance and growth.",
    content: `Good corporate governance is essential for sustainable business growth and maintaining stakeholder confidence. It provides the framework for achieving company objectives while managing risk.

Key principles:
- Transparency in operations and reporting
- Accountability of management and board
- Fairness to all stakeholders
- Responsibility in decision-making

Essential governance structures:
- Board of Directors composition
- Audit committees
- Risk management frameworks
- Internal control systems

Benefits of strong governance:
- Improved access to capital
- Better risk management
- Enhanced reputation
- Increased operational efficiency
- Greater stakeholder trust

Implementing proper governance structures early can prevent costly problems later.`,
    date: "2024-10-30",
    category: "Corporate Law",
    readTime: "7 min",
  },
]
