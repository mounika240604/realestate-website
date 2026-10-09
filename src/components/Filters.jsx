const PRICE_SALE = [['', 'Any price'], ['0-5000000', 'Under ₹50 L'], ['5000000-10000000', '₹50 L – ₹1 Cr'], ['10000000-20000000', '₹1 – 2 Cr'], ['20000000-999999999', 'Above ₹2 Cr']]
const PRICE_RENT = [['', 'Any price'], ['0-20000', 'Under ₹20k'], ['20000-40000', '₹20k – ₹40k'], ['40000-999999999', 'Above ₹40k']]

export default function Filters({ params, setParam, reset, cities }) {
  const g = (k) => params.get(k) || ''
  const prices = g('status') === 'rent' ? PRICE_RENT : PRICE_SALE
  const Field = ({ label, k, children }) => (
    <div><label className="label" htmlFor={k}>{label}</label>{children}</div>
  )
  return (
    <aside className="rounded-2xl border border-ink/10 bg-white p-5 lg:sticky lg:top-24">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Filters</h2>
        <button onClick={reset} className="text-sm text-sea hover:underline">Clear all</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <Field label="Search" k="q"><input id="q" className="input" placeholder="Area, city or name" value={g('q')} onChange={(e) => setParam('q', e.target.value)} /></Field>
        <Field label="Listing" k="status">
          <select id="status" className="input" value={g('status')} onChange={(e) => { setParam('status', e.target.value); setParam('price', '') }}>
            <option value="">Buy or rent</option><option value="sale">For sale</option><option value="rent">For rent</option>
          </select>
        </Field>
        <Field label="City" k="city">
          <select id="city" className="input" value={g('city')} onChange={(e) => setParam('city', e.target.value)}>
            <option value="">All cities</option>{cities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Type" k="type">
          <select id="type" className="input" value={g('type')} onChange={(e) => setParam('type', e.target.value)}>
            <option value="">Any type</option><option value="apartment">Apartment</option><option value="villa">Villa</option><option value="house">House</option><option value="studio">Studio</option>
          </select>
        </Field>
        <Field label="Bedrooms" k="beds">
          <select id="beds" className="input" value={g('beds')} onChange={(e) => setParam('beds', e.target.value)}>
            <option value="">Any</option>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+ beds</option>)}
          </select>
        </Field>
        <Field label="Price" k="price">
          <select id="price" className="input" value={g('price')} onChange={(e) => setParam('price', e.target.value)}>
            {prices.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
          </select>
        </Field>
        <Field label="Sort by" k="sort">
          <select id="sort" className="input" value={g('sort')} onChange={(e) => setParam('sort', e.target.value)}>
            <option value="">Featured first</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="new">Newest built</option>
          </select>
        </Field>
      </div>
    </aside>
  )
}
