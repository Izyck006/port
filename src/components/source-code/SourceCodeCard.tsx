import React from 'react';
import { FileArchive, Download, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SourceCodeItem } from '../../data/sourceCodeItems';

interface SourceCodeCardProps {
  item: SourceCodeItem;
  downloadCount: number;
  onSelect: (item: SourceCodeItem) => void;
}

export const SourceCodeCard: React.FC<SourceCodeCardProps> = ({ item, downloadCount, onSelect }) => {
  return (
    <motion.div 
      className="source-folder-card glass"
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      layout
    >
      <div className="folder-tab-bar">
        <div className="folder-tab-accent"></div>
        <div className="folder-stitched-line"></div>
      </div>

      <div className="folder-card-body">
        <div className="file-header-row">
          <div className="file-id-badge">
            <div className="file-icon-wrap">
              <FileArchive size={20} className="file-icon" />
            </div>
            <div className="file-name-meta">
              <h4 className="file-zip-name">{item.fileName}</h4>
              <span className="file-size-info">ZIP archive · {item.fileSize}</span>
            </div>
          </div>

          <div className="download-counter-badge" title={`${downloadCount} verified downloads`}>
            <Download size={13} className="download-icon-anim" />
            <span>{downloadCount}</span>
          </div>
        </div>

        <div className="folder-content-body">
          <h3 className="folder-item-title">{item.title}</h3>
          <p className="folder-item-desc">{item.description}</p>
        </div>

        <div className="folder-tags-row">
          <span className="folder-primary-lang">{item.language}</span>
          {item.tags.slice(1, 4).map((tag, idx) => (
            <span key={idx} className="folder-sub-tag">{tag}</span>
          ))}
        </div>

        <div className="folder-card-divider"></div>

        <div className="folder-card-footer">
          <div className="folder-price-tag">
            <span className="currency-symbol">{item.currency}</span>
            <span className="amount-number">{item.price.toLocaleString()}</span>
          </div>

          <button 
            type="button" 
            className="get-code-btn"
            onClick={() => onSelect(item)}
          >
            <span>Get the code</span>
            <ArrowUpRight size={16} className="arrow-icon" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
