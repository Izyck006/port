/**
 * Paystack Inline Integration Utility
 */

export interface PaystackConfig {
  key: string;
  email: string;
  amount: number; // in kobo (e.g., 1500000 for 15,000 NGN)
  currency?: string;
  ref?: string;
  metadata?: Record<string, any>;
  onSuccess: (reference: any) => void;
  onClose: () => void;
}

export function loadPaystackScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).PaystackPop) {
      resolve(true);
      return;
    }
    const existingScript = document.getElementById('paystack-inline-js');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }
    const script = document.createElement('script');
    script.id = 'paystack-inline-js';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function initializePaystackPayment(config: PaystackConfig): Promise<boolean> {
  const loaded = await loadPaystackScript();
  if (!loaded || !(window as any).PaystackPop) {
    console.error('Failed to load Paystack Inline SDK.');
    return false;
  }

  const handler = (window as any).PaystackPop.setup({
    key: config.key,
    email: config.email,
    amount: config.amount,
    currency: config.currency || 'NGN',
    ref: config.ref || `PS_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
    metadata: config.metadata || {},
    callback: function (response: any) {
      config.onSuccess(response);
    },
    onClose: function () {
      config.onClose();
    },
  });

  handler.openIframe();
  return true;
}

/**
 * Triggers instant download of the purchased file.
 * In production, this can point to a signed S3/Firebase Storage URL or direct public asset.
 */
export function triggerInstantDownload(fileName: string, title: string) {
  // Create an informative README package blob if remote zip isn't hosted yet
  const content = `=====================================================
${title}
Source Code Archive: ${fileName}
Purchased from Isaac Engineering Portfolio
Reference: PAID_${Date.now()}
=====================================================

Thank you for purchasing this source code package!

Getting Started:
1. Unzip the project files into your working directory.
2. Read the project README.md for setup instructions, environment variables, and dependencies.
3. Run \`npm install\` or \`pip install -r requirements.txt\` depending on the stack.

Support:
For questions, assistance, or customizations, reach out directly:
- Email: ehimenaudu56@gmail.com
- GitHub: https://github.com/Izyck006
=====================================================`;

  const blob = new Blob([content], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
