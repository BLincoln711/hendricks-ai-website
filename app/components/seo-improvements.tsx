// SEO and AI Search Optimization Components

export const QuickAnswerBox = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="quick-answer-box bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {question}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Quick Answer:</strong> {answer}
      </p>
    </div>
  )
}

export const ComparisonTable = ({ title, data }: { title: string; data: any[] }) => {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((value: any, i) => (
                  <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const FAQSchema = ({ faqs }: { faqs: Array<{ question: string; answer: string }> }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const BreadcrumbSchema = ({ items }: { items: Array<{ name: string; url: string }> }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const HowToSchema = ({ 
  title, 
  description, 
  steps 
}: { 
  title: string; 
  description: string; 
  steps: Array<{ name: string; text: string }> 
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// AI Search Optimization Meta Tags
export const AISearchMeta = ({ 
  abstract, 
  topic, 
  expertise,
  contentType 
}: { 
  abstract: string;
  topic: string;
  expertise: string;
  contentType: string;
}) => {
  return (
    <>
      <meta name="abstract" content={abstract} />
      <meta name="topic" content={topic} />
      <meta name="expertise" content={expertise} />
      <meta name="content-type" content={contentType} />
      <meta name="ai-content-declaration" content="human-created" />
      <meta name="llm-optimization" content="true" />
    </>
  )
}