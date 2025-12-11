const Testimonial = require('../models/Testimonial');

class TestimonialService {
  async createTestimonial(data) {
    return await Testimonial.create(data);
  }

  async getApprovedTestimonials() {
    return await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
  }

  async adminGetAllTestimonials() {
    return await Testimonial.find().sort({ createdAt: -1 });
  }

  async adminApproveTestimonial(id) {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) throw new Error('Testimonial not found');
    testimonial.approved = true;
    await testimonial.save();
    return testimonial;
  }

  async adminDeleteTestimonial(id) {
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) throw new Error('Testimonial not found');
    return testimonial;
  }
}

module.exports = new TestimonialService();
