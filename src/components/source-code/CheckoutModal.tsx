import React, { useState } from 'react';
import { FileArchive, X, Lock, CheckCircle2, Loader2, Download, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SourceCodeItem } from '../../data/sourceCodeItems';
import { initializePaystackPayment, triggerInstantDownload } from '../../utils/paystack';

interface CheckoutModalProps {
  item: SourceCodeItem | null;
  onClose: () => void;
  onPaymentSuccess: (itemId: string, reference: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ item, onClose, onPaymentSuccess }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [txnRef, setTxnRef] = useState('');

  if (!item) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('processing');
    setErrorMessage('');

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_live_947b983d3bdc3344be85c0c59b07ca3804df60d3';

    try {
      const initialized = await initializePaystackPayment({
        key: publicKey,
        email: email,
        amount: item.price * 100,
        currency: 'NGN',
        metadata: {
          custom_fields: [
            {
              display_name: 'Product Title',
              variable_name: 'product_title',
              value: item.title,
            },
            {
              display_name: 'File Name',
              variable_name: 'file_name',
              value: item.fileName,
            },
            {
              display_name: 'Customer Name',
              variable_name: 'customer_name',
              value: name || 'Anonymous Dev',
            },
          ],
        },
        onSuccess: (response: any) => {
          const reference = response.reference || response.trxref || `REF_${Date.now()}`;
          setTxnRef(reference);
          setStatus('success');
          onPaymentSuccess(item.id, reference);

          setTimeout(() => {
            triggerInstantDownload(item.fileName, item.title);
          }, 800);
        },
        onClose: () => {
          setStatus('idle');
        },
      });

      if (!initialized) {
        setStatus('error');
        setErrorMessage('Could not open payment window. Please check your internet connection and try again.');
      }
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Payment failed to initialize.');
    }
  };

  const handleDownloadAgain = () => {
    triggerInstantDownload(item.fileName, item.title);
  };

  return (
    <AnimatePresence>
      <div className="checkout-modal-backdrop" onClick={onClose}>
        <motion.div 
          className="checkout-modal-card glass"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <div className="modal-header-row">
            <div className="modal-item-info">
              <div className="modal-icon-badge">
                <FileArchive size={22} className="modal-file-icon" />
              </div>
              <div className="modal-titles">
                <h3 className="modal-item-title">{item.title}</h3>
                <span className="modal-item-sub">Source code — instant ZIP download</span>
              </div>
            </div>

            <div className="modal-header-right">
              <div className="modal-price-badge">
                {item.currency}{item.price.toLocaleString()}
              </div>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {status === 'success' ? (
            <motion.div 
              className="modal-success-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="success-icon-wrap">
                <CheckCircle2 size={48} color="#22c55e" />
              </div>
              <h4>Payment Confirmed!</h4>
              <p>Your ZIP archive <strong>{item.fileName}</strong> has started downloading.</p>
              
              <div className="receipt-box">
                <div className="receipt-row">
                  <span>Reference:</span>
                  <span className="receipt-code">{txnRef}</span>
                </div>
                <div className="receipt-row">
                  <span>Delivered to:</span>
                  <span>{email}</span>
                </div>
              </div>

              <div className="modal-success-actions">
                <button 
                  type="button" 
                  className="btn primary re-download-btn"
                  onClick={handleDownloadAgain}
                >
                  <Download size={16} /> Download ZIP Again
                </button>
                <button 
                  type="button" 
                  className="btn secondary"
                  onClick={onClose}
                >
                  Done
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="modal-checkout-form">
              {status === 'error' && (
                <div className="modal-error-banner">
                  <AlertCircle size={16} />
                  <span>{errorMessage || 'Payment could not be processed.'}</span>
                </div>
              )}

              <div className="modal-form-group">
                <label htmlFor="customer-email">Email</label>
                <input
                  id="customer-email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'processing'}
                  autoFocus
                />
              </div>

              <div className="modal-form-group">
                <label htmlFor="customer-name">Name <span className="optional-tag">(optional)</span></label>
                <input
                  id="customer-name"
                  type="text"
                  placeholder="Isaac Developer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === 'processing'}
                />
              </div>

              <button
                type="submit"
                className="modal-pay-button"
                disabled={status === 'processing' || !email}
              >
                {status === 'processing' ? (
                  <>
                    <Loader2 size={18} className="spin-icon" />
                    <span>Connecting Paystack...</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Pay {item.currency}{item.price.toLocaleString()}</span>
                  </>
                )}
              </button>

              <p className="modal-security-note">
                Secured by 256-bit bank-grade encryption via Paystack. Supports Cards, Transfers, USSD & Apple Pay.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
