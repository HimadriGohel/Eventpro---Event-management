import { User } from '../../models/User.js';

export class AuthRepository {
  findById(id) {
    return User.findById(id);
  }

  findByEmail(email, { withPassword = false } = {}) {
    const q = User.findOne({ email: email.toLowerCase() });
    return withPassword ? q.select('+password') : q;
  }

  existsByEmail(email) {
    return User.exists({ email: email.toLowerCase() });
  }

  create(data) {
    return User.create(data);
  }

  countAll() {
    return User.estimatedDocumentCount();
  }

  updateLastLogin(id) {
    return User.updateOne({ _id: id }, { $set: { lastLoginAt: new Date() } });
  }

  setEmailVerified(id) {
    return User.updateOne({ _id: id }, { $set: { emailVerifiedAt: new Date() } });
  }

  setPassword(id, hashed) {
    return User.updateOne({ _id: id }, { $set: { password: hashed } });
  }

  setRole(id, role) {
    return User.updateOne({ _id: id }, { $set: { role } });
  }
}

export const authRepository = new AuthRepository();
