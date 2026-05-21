---
layout: layouts/base.njk
title: Contact Us - Quanah Parker Trail
permalink: /contact.html
# Add bodyClass if you want specific body styles for this page
# bodyClass: page-contact
---

<div class="county-header"> {# Re-using county header style for consistency #}
    <h1>Contact Us</h1>
    <p style="font-family: 'Montserrat', sans-serif; color: #555;">Have questions about the Quanah Parker Trail? Send us a message!</p>
</div>

<div class="county-content"> {# Re-using county content style for layout #}

    <p>Please use the form below to get in touch. We'll do our best to respond as soon as possible.</p>

    {# FORM STRUCTURE - Replace ACTION with your Formspree endpoint #}
    <form action="https://formspree.io/f/YOUR_UNIQUE_FORM_ID" method="POST" class="contact-form">

      <div class="form-group">
        <label for="contact-name" class="form-label">Your Name:</label>
        <input type="text" id="contact-name" name="name" class="form-control" required>
      </div>

      <div class="form-group">
        <label for="contact-email" class="form-label">Your Email:</label>
        {# Use type="email" for basic browser validation #}
        <input type="email" id="contact-email" name="email" class="form-control" required>
      </div>

      <div class="form-group">
        <label for="contact-subject" class="form-label">Subject:</label>
        <input type="text" id="contact-subject" name="subject" class="form-control">
         {# Subject is often optional #}
      </div>

      <div class="form-group">
        <label for="contact-message" class="form-label">Message:</label>
        <textarea id="contact-message" name="message" rows="6" class="form-control" required></textarea>
      </div>

      {# Optional: Add basic spam protection like a honeypot field if your service doesn't handle it well #}
      {# <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></div> #}

      <div class="form-group">
        <button type="submit" class="form-button">Send Message</button>
      </div>

    </form>

    {# Add any other contact info like mailing address if needed #}
    {# <p>Alternatively, you can reach us by mail at:</p> #}
    {# <address>...</address> #}

</div> {# End county-content #}