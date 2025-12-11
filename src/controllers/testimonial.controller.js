const testimonialService = require('../services/testimonial.service');

// Public: create a testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = await testimonialService.createTestimonial(req.body);
    res.json({ ok: true, testimonial });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Public: get approved testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.getApprovedTestimonials();
    res.json({ ok: true, testimonials });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Admin: get all testimonials
exports.adminGetAllTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.adminGetAllTestimonials();
    res.json({ ok: true, testimonials });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Admin: approve testimonial
exports.adminApproveTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await testimonialService.adminApproveTestimonial(id);
    res.json({ ok: true, testimonial });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Admin: delete testimonial
exports.adminDeleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await testimonialService.adminDeleteTestimonial(id);
    res.json({ ok: true, testimonial });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};
