import React, { useState, useEffect } from 'react';
import { Search, Code2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_SOURCE_CODE_ITEMS, SourceCodeItem } from '../../data/sourceCodeItems';
import { SourceCodeCard } from './SourceCodeCard';
import { CheckoutModal } from './CheckoutModal';
import { SupportWork } from './SupportWork';

export const SourceCodeSection: React.FC = () => {
  const [items] = useState<SourceCodeItem[]>(INITIAL_SOURCE_CODE_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<SourceCodeItem | null>(null);

  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('isaac_source_downloads');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    const initial: Record<string, number> = {};
    INITIAL_SOURCE_CODE_ITEMS.forEach((it) => {
      initial[it.id] = it.initialDownloads;
    });
    return initial;
  });

  useEffect(() => {
    try {
      localStorage.setItem('isaac_source_downloads', JSON.stringify(downloadCounts));
    } catch {}
  }, [downloadCounts]);

  const handlePaymentSuccess = (itemId: string, _reference: string) => {
    setDownloadCounts((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const filteredItems = items.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.language.toLowerCase().includes(q) ||
      item.fileName.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="source-code" className="relative z-10 source-code-section">
      <motion.div
        className="section-header-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUp}
      >
        <div className="source-title-row">
          <div className="title-with-pill">
            <h2 className="source-main-title">All source code</h2>
            <span className="total-count-pill">{items.length} in total</span>
          </div>

          <div className="search-bar-wrap">
            <Search size={18} className="search-input-icon" />
            <input
              type="text"
              placeholder="Search source code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="source-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <div className="source-grid-container">
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <SourceCodeCard
                key={item.id}
                item={item}
                downloadCount={downloadCounts[item.id] ?? item.initialDownloads}
                onSelect={(selected) => setSelectedItem(selected)}
              />
            ))
          ) : (
            <motion.div
              className="source-empty-state glass"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Code2 size={40} className="empty-icon" />
              <h3>No source code found</h3>
              <p>No project matches "{searchQuery}". Try searching for Python, React, Biometrics, or AI.</p>
              <button
                type="button"
                className="btn secondary reset-btn"
                onClick={() => setSearchQuery('')}
              >
                Reset Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="support-work-wrapper mt-50">
        <SupportWork />
      </div>

      {selectedItem && (
        <CheckoutModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </section>
  );
};
