/** Yapısal veriyi <script type="application/ld+json"> olarak basar. */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Veri tamamen kendi içeriğimizden geliyor, kullanıcı girdisi yok.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
