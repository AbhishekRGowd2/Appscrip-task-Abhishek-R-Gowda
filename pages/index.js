import { useState } from "react";
import Head from "next/head";
import ProductCard from "../components/productCard";

export default function Home({ products }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("Popular"); // new state

  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    code: "USD",
    flag: "https://flagcdn.com/us.svg",
  });

  const currencies = [
    { code: "USD", flag: "https://flagcdn.com/us.svg" },
    { code: "EUR", flag: "https://flagcdn.com/eu.svg" },
    { code: "CAD", flag: "https://flagcdn.com/ca.svg" },
    { code: "INR", flag: "https://flagcdn.com/in.svg" },
  ];

  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // uncheck
        : [...prev, category] // check
    );
  };

  // Apply category filter
  let filteredProducts =
    selectedCategories.length > 0
      ? products.filter((p) => selectedCategories.includes(p.category))
      : products;

  // Apply sorting
  if (sortOption === "Price: Low to High") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "Popular") {
    // Sort by highest rating first
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating.rate - a.rating.rate
    );
  }

  return (
    <div>
      <Head>
        <meta property="og:title" content="Discover Our Products | mettä muse" />
        <meta
          property="og:description"
          content="Curated fashion, electronics, jewelry, and more. Shop trending products with reviews."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Discover Our Products | mettä muse" />
        <meta
          name="twitter:description"
          content="Shop curated collections of fashion, jewelry, and more."
        />
        <meta name="twitter:image" content="/og-image.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProductCollection",
              "name": "mettā muse Products",
              "url": "https://appscrip-next.vercel.app", // permanent production domain
              "product": products.map((p) => ({
                "@type": "Product",
                "name": p.title,
                "image": p.image,
                "description": p.description,
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "USD",
                  "price": p.price,
                  "availability": "https://schema.org/InStock",
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": p.rating.rate,
                  "reviewCount": p.rating.count,
                },
              })),
            }),
          }}
        />
      </Head>

      <header className="site-header">
        <div className="container header-top">
          <div className="header-left">
            <img src="/next.svg" alt="Brand Icon" className="brand-icon" />
          </div>
          <div className="header-center">
            <div className="logo">LOGO</div>
          </div>
          <div className="header-right">
            <button className="icon-btn"><i className="fas fa-search"></i></button>
            <button className="icon-btn"><i className="far fa-heart"></i></button>
            <button className="icon-btn"><i className="fas fa-shopping-bag"></i></button>
            <button className="icon-btn"><i className="far fa-user"></i></button>
            <div className="lang-dropdown">
              ENG <span>▼</span>
            </div>
          </div>
        </div>

        <nav className="main-nav">
          <a href="#">SHOP</a>
          <a href="#">SKILLS</a>
          <a href="#">STORIES</a>
          <a href="#">ABOUT</a>
          <a href="#">CONTACT US</a>
        </nav>
      </header>


      <main className="container main">
        <h1 className="page-title">DISCOVER OUR PRODUCTS</h1>
        <p className="lead">Server-side rendered products from fakestoreapi.com</p>

        <div className="layout">
          <aside className="sidebar">
            <h2>Categories</h2>
            {categories.map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            ))}
          </aside>

          <section className="content">
            <div className="controls">
              <div>
                Showing <strong>{filteredProducts.length}</strong> products
              </div>
              <div className="sort">
                <label htmlFor="sort">Sort:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="Popular">Popular</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                </select>
              </div>
            </div>

            <div className="grid">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer class="site-footer">
        <div class="container footer-top">
          <div className="footer-col">
            <h3>BE THE FIRST TO KNOW</h3>
            <p>Sign up for updates from mettä muse.</p>
            <form className="subscribe-form">
              <input type="email" placeholder="Enter your e-mail" />
              <button type="submit" className="subscribe-btn">SUBSCRIBE</button>
            </form>
          </div>

          {/* Contact & Currency Section */}
          <div className="footer-col">
            <div className="contact-block">
              <h3>CONTACT US</h3>
              <p>+44 221 133 5360</p>
              <p>customercare@mettamuse.com</p>
            </div>

            <div className="currency-block">
              <h3>CURRENCY</h3>
              <div
                className={`currency-select ${currencyOpen ? "active" : ""}`}
              >
                <button
                  type="button"
                  className="currency-btn"
                  onClick={() => setCurrencyOpen(!currencyOpen)}
                >
                  <img src={selectedCurrency.flag} alt={selectedCurrency.code} />
                  {selectedCurrency.code}
                  <span className="arrow">▼</span>
                </button>
                {currencyOpen && (
                  <ul className="currency-options">
                    {currencies.map((c) => (
                      <li
                        key={c.code}
                        onClick={() => {
                          setSelectedCurrency(c);
                          setCurrencyOpen(false);
                        }}
                      >
                        <img src={c.flag} alt={c.code} />
                        {c.code}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <small>
                Transactions will be completed in Euros and a currency reference is available on hover.
              </small>
            </div>

          </div>
        </div>

        <hr class="footer-separator" />

        <div class="container footer-bottom">
          <div class="footer-links">
            <div class="footer-col">
              <h3>mettā muse</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Stories</a></li>
                <li><a href="#">Artisans</a></li>
                <li><a href="#">Boutiques</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">EU Compliances Docs</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h3>QUICK LINKS</h3>
              <ul>
                <li><a href="#">Orders & Shipping</a></li>
                <li><a href="#">Join/Login as a Seller</a></li>
                <li><a href="#">Payment & Pricing</a></li>
                <li><a href="#">Return & Refunds</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h3>FOLLOW US</h3>
              <div class="social-icons">
                <a href="#">🌐 IG</a>
                <a href="#">🌐 IN</a>
              </div>
              <h3>mettā muse ACCEPTS</h3>
              <div class="payment-icons">
                <img src="https://img.icons8.com/?size=100&id=L1ws9zn2uD01&format=png&color=000000"
                  alt="Google Pay" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
                <img src="https://download.logo.wine/logo/Mastercard/Mastercard-Logo.wine.png"
                  alt="MasterCard" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
                  alt="Amex" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="Apple Pay" />
                <img src="https://download.logo.wine/logo/PayPal/PayPal-Logo.wine.png"
                  alt="PayPal" />
              </div>
            </div>
          </div>
        </div>

        <div class="footer-copy">
          <div class="container">
            <p>Copyright © 2023 mettamuse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('Failed to fetch');
    const products = await res.json();
    return { props: { products } };
  } catch (err) {
    // Return empty array or redirect or show error page
    return { props: { products: [] } };
  }
}

