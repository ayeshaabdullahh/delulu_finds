import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const KIT_FORM_CK_JS = 'https://f.convertkit.com/ckjs/ck.5.js';

const KIT_FORM_HTML = `
<form action="https://app.kit.com/forms/9884499/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="9884499" data-uid="c29bbbb993" data-format="inline" data-version="5" data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;message&quot;,&quot;success_message&quot;:&quot;Success! Now check your email to confirm your subscription.&quot;,&quot;redirect_url&quot;:&quot;&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;fathom&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null,&quot;sparkloop&quot;:null,&quot;googletagmanager&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;powered_by&quot;:{&quot;show&quot;:true,&quot;url&quot;:&quot;https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;}" min-width="400 500 600 700 800" style="background-color: rgb(249, 250, 251); border-radius: 12px; max-width: 100%; border: 1px solid rgb(227, 227, 227);">
  <div data-style="minimal" style="padding: 24px;">
    <div class="formkit-header" data-element="header" style="color: rgb(77, 77, 77); font-size: 22px; font-weight: 700;">Join the Newsletter</div>
    <div class="formkit-subheader" data-element="subheader" style="color: rgb(104, 104, 104); font-size: 15px;">Subscribe to get our latest content by email.</div>
    <ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
    <div data-element="fields" data-stacked="false" class="seva-fields formkit-fields" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px;">
      <div class="formkit-field" style="min-width: 220px; flex: 1 1 100%; margin: 0;">
        <input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="width: 100%; padding: 13px 14px; border: 1px solid rgb(209, 213, 219); border-radius: 99px; font-size: 15px; color: rgb(0, 0, 0); background: #fff; box-sizing: border-box;">
      </div>
      <button data-element="submit" class="formkit-submit formkit-submit" style="flex: 1 1 100%; margin: 0; color: rgb(255, 255, 255); background-color: rgb(78, 70, 102); border: 0; border-radius: 99px; cursor: pointer; padding: 0; font-weight: 500;">
        <div class="formkit-spinner"><div></div><div></div><div></div></div>
        <span class="" style="display: block; padding: 13px 24px; font-size: 14px; letter-spacing: 0.05em; text-transform: uppercase;">Subscribe</span>
      </button>
    </div>
    <div class="formkit-guarantee" data-element="guarantee" style="color: rgb(77, 77, 77); font-size: 13px; font-weight: 400; text-align: center; margin-top: 14px;">We won't send you spam. Unsubscribe at any time.</div>
    <div class="formkit-powered-by-convertkit-container" style="display: flex; width: 100%; margin: 10px 0; position: relative; justify-content: center;">
      <a href="https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic" data-element="powered-by" class="formkit-powered-by-convertkit" data-variant="dark" target="_blank" rel="nofollow noopener" style="align-items: center; color: rgb(61, 61, 61); display: inline-flex; font-size: 12px; text-decoration: none;">Built with Kit</a>
    </div>
  </div>
</form>`;

export default function Newsletter() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = document.querySelector('script[data-formkit]');
    if (!existing) {
      const s = document.createElement('script');
      s.setAttribute('data-formkit', 'true');
      s.src = KIT_FORM_CK_JS;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <section id="newsletter" className="py-20 sm:py-28 relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-mauve/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-charcoal/5 blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-mauve/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-charcoal/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-mauve/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles size={24} className="text-mauve" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal mb-3">
              Never Miss a <span className="text-mauve italic">Find</span>
            </h2>
            <p className="text-muted text-sm sm:text-base mb-8 max-w-md mx-auto font-body">
              Get the best curated finds and sale alerts delivered straight to your inbox. No spam, just the good stuff.
            </p>

            <div
              ref={containerRef}
              className="w-full max-w-md mx-auto text-left overflow-hidden rounded-[12px]"
              dangerouslySetInnerHTML={{ __html: KIT_FORM_HTML }}
            />

            <p className="text-muted text-[11px] mt-4 tracking-wide font-body">
              We only send the best finds. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}