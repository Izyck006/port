import React, { useState } from 'react';
import { Heart, Lock, CheckCircle2, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializePaystackPayment } from '../../utils/paystack';

export const SupportWork: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isOther, setIsOther] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const presetAmounts = [2000, 5000, 10000, 20000];

  const handleSelectPreset = (amt: number) => {
    setSelectedAmount(amt);
    setIsOther(false);
    setIsModalOpen(true);
  };

  const handleSelectOther = () => {
    setIsOther(true);
    setSelectedAmount(null);
    setIsModalOpen(true);
  };

  const activeAmount = isOther ? parseInt(customAmount, 10) || 0 : selectedAmount || 0;

  const handlePayTip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || activeAmount <= 0) return;

    setStatus('processing');
    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_live_947b983d3bdc3344be85c0c59b07ca3804df60d3';

    try {
      const initialized = await initializePaystackPayment({
        key: publicKey,
        email: email,
        amount: activeAmount * 100,
        currency: 'NGN',
        metadata: {
          custom_fields: [
            {
              display_name: 'Donation Type',
              variable_name: 'donation_type',
              value: 'Support Developer Work',
            },
            {
              display_name: 'Donor Name',
              variable_name: 'donor_name',
              value: name || 'Supporter',
            },
          ],
        },
        onSuccess: () => {
          setStatus('success');
        },
        onClose: () => {
          setStatus('idle');
        },
      });

      if (!initialized) {
        setStatus('idle');
      }
    } catch {
      setStatus('idle');
    }
  };

  return (
    <div className="support-work-card glass">
      <div className="support-work-content">
        <div className="support-text-meta">
          <div className="support-header">
            <Heart size={20} className="heart-icon" />
            <h3>Support the work</h3>
          </div>
          <p>If an open-source project, archive or guide helped you build, chip in whatever you like.</p>
        </div>

        <div className="support-chips-row">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              className="support-chip-btn"
              onClick={() => handleSelectPreset(amt)}
            >
              ₦{amt.toLocaleString()}
            </button>
          ))}
          <button
            type="button"
            className="support-chip-btn other-chip"
            onClick={handleSelectOther}
          >
            Other
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="checkout-modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <motion.div
              className="checkout-modal-card glass"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="modal-header-row">
                <div className="modal-item-info">
                  <div className="modal-icon-badge tip-badge">
                    <Heart size={22} className="modal-heart-icon" />
                  </div>
                  <div className="modal-titles">
                    <h3 className="modal-item-title">Support Isaac's Work</h3>
                    <span className="modal-item-sub">One-time developer sponsorship</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              {status === 'success' ? (
                <div className="modal-success-view">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={48} color="#22c55e" />
                  </div>
                  <h4>Thank You So Much!</h4>
                  <p>Your support of ₦{activeAmount.toLocaleString()} keeps this code ecosystem growing and open.</p>
                  <button
                    type="button"
                    className="btn primary"
                    onClick={() => {
                      setIsModalOpen(false);
                      setStatus('idle');
                    }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePayTip} className="modal-checkout-form">
                  {isOther && (
                    <div className="modal-form-group">
                      <label htmlFor="custom-tip-amount">Custom Amount (₦ NGN)</label>
                      <input
                        id="custom-tip-amount"
                        type="number"
                        min="500"
                        step="500"
                        placeholder="e.g. 15000"
                        required
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        autoFocus
                      />
                    </div>
                  )}

                  <div className="modal-form-group">
                    <label htmlFor="donor-email">Your Email</label>
                    <input
                      id="donor-email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="donor-name">Your Name (optional)</label>
                    <input
                      id="donor-name"
                      type="text"
                      placeholder="Supporter"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="modal-pay-button"
                    disabled={status === 'processing' || activeAmount <= 0 || !email}
                  >
                    {status === 'processing' ? (
                      <>
                        <Loader2 size={18} className="spin-icon" />
                        <span>Connecting Paystack...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        <span>Support with ₦{activeAmount.toLocaleString()}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
