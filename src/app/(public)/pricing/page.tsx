import { Check } from "lucide-react";
import { FAQ, PRICING_PLANS } from "./constants";



export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h1 className="mb-6">Choose your plan</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Start for free, upgrade when you need more. All plans include a 14-day free trial.
          </p>
        </div>

       {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative group ${
                  plan.popular ? "md:-translate-y-4" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-rose-600 rounded-full text-sm">
                    Most Popular
                  </div>
                )}

                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-gray-900 rounded-3xl" />
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-3xl blur-xl from-rose-600 to-rose-700" />
                  )}

                  <div className={`relative p-8 rounded-3xl border-2 h-full flex flex-col ${
                    plan.popular
                      ? "border-rose-600 bg-gradient-to-br from-slate-800/80 to-gray-900/80"
                      : "border-slate-700 hover:border-rose-600/50"
                  } transition-colors duration-300`}>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h2 className="mb-2">{plan.name}</h2>
                    <p className="text-slate-400 mb-6 flex-grow">
                      {plan.description}
                    </p>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl">${plan.price}</span>
                        {plan.price !== "0" && (
                          <span className="text-slate-400">/month</span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8 flex-grow">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-400">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-4 rounded-xl transition-all duration-200 ${
                        plan.popular
                          ? "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30 hover:shadow-xl hover:shadow-rose-600/40"
                          : "bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-rose-600 text-white"
                      }`}
                    >
                      {plan.price === "0" ? "Get Started" : "Start Free Trial"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-3xl mx-auto">
          <h2 className="text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-6">
            {FAQ.map((faq, index) => (
              <div
                key={index}
                className="p-6 mb-4 bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl border border-slate-700"
              >
                <h3 className="mb-3">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
