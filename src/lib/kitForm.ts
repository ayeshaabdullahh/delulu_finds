// ─────────────────────────────────────────────────────────────────────────────
// STATIC, TRUSTED CONTENT ONLY
// -----------------------------------------------------------------------------
// KIT_FORM_CK_JS and KIT_FORM_HTML are hardcoded, first-party Kit (ConvertKit)
// embed assets. They are safe to use with dangerouslySetInnerHTML ONLY
// because they are never derived from user input.
//
// ⚠️ WARNING: This module must never receive, interpolate, or be replaced by
// user-supplied / unsanitized content. If the embed HTML ever needs to be
// dynamic, it MUST first be sanitized (e.g. DOMPurify) or the form must be
// replaced with a proper React-rendered form. Do NOT build strings from form
// submissions, query params, or any external API into this constant.
// ─────────────────────────────────────────────────────────────────────────────

export const KIT_FORM_CK_JS = 'https://f.convertkit.com/ckjs/ck.5.js';

export const KIT_FORM_HTML = `
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