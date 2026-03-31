import MortgageCalculator from '@/components/MortgageCalculator';
import { CheckCircle } from 'lucide-react';

export default function CalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1a1a1a' }}>
          Canadian Mortgage Calculator
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Estimate your monthly mortgage payments and plan your home purchase with
          confidence using our Canadian mortgage calculator.
        </p>
      </div>

      {/* Calculator */}
      <MortgageCalculator defaultPrice={500000} />

      {/* Canadian Mortgage Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#146FB7' }}>
            Canadian Mortgage Rules
          </h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#146FB7' }} />
              <span>
                <strong>Minimum down payment:</strong> 5% on homes under $500,000; 10% on the
                portion between $500K–$999,999; 20% on homes $1M+.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#146FB7' }} />
              <span>
                <strong>CMHC mortgage insurance</strong> is required when your down payment is
                less than 20%. Premiums range from 0.6% to 4% of the mortgage amount.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#146FB7' }} />
              <span>
                <strong>Maximum amortization:</strong> 25 years for insured mortgages
                (under 20% down); up to 30 years for uninsured.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#146FB7' }} />
              <span>
                <strong>Interest compounding:</strong> Canadian mortgage interest is
                compounded semi-annually (not monthly, as in the US).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#146FB7' }} />
              <span>
                <strong>Stress test:</strong> You must qualify at the higher of 5.25%
                or your contract rate + 2% to ensure affordability.
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#146FB7' }}>
            Buying in Brantford
          </h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#58b3e5' }} />
              <span>
                <strong>Average home price</strong> in Brantford is significantly more
                affordable than the GTA, making it a great option for first-time buyers.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#58b3e5' }} />
              <span>
                <strong>Land transfer tax</strong> applies in Ontario. First-time buyers
                may qualify for a rebate of up to $4,000.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#58b3e5' }} />
              <span>
                <strong>Property taxes</strong> in Brantford are set by the city. Budget
                approximately 1–1.5% of your home&apos;s assessed value annually.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#58b3e5' }} />
              <span>
                <strong>Home inspection</strong> is strongly recommended before any purchase.
                Typical cost is $400–$600 in the Brantford area.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#58b3e5' }} />
              <span>
                <strong>Legal fees</strong> (lawyer/notary) typically run $1,500–$2,500 for a
                residential purchase.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div
        className="mt-10 rounded-2xl p-8 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #1a1a1a, #146FB7)' }}
      >
        <h2 className="text-2xl font-bold mb-3">Talk to a Mortgage Expert</h2>
        <p className="text-gray-300 mb-6 max-w-lg mx-auto">
          Our agents work with trusted mortgage brokers in Brantford who can help you
          get pre-approved and find the best rate for your situation.
        </p>
        <a
          href="mailto:info@payitforwardrealty.ca"
          className="inline-block px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#58b3e5' }}
        >
          Book a Free Consultation
        </a>
      </div>
    </div>
  );
}
