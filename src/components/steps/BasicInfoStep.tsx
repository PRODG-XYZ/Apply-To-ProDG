'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { ApplicationFormData } from '@/types/application';

interface BasicInfoStepProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
}

export default function BasicInfoStep({ register, errors, watch }: BasicInfoStepProps) {
  const heardAboutUs = watch('heardAboutUs');
  const inputVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const
      }
    })
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4">
          Let&apos;s start with the basics
        </h2>
        <p className="text-lg text-gray-600 font-light">
          Just a few details to get to know you
        </p>
      </div>

      <div className="space-y-6">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            placeholder="What should we call you?"
            className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none transition-colors duration-300 text-lg bg-transparent text-gray-900 placeholder-gray-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            placeholder="Where should we send good news?"
            className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none transition-colors duration-300 text-lg bg-transparent text-gray-900 placeholder-gray-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            {...register('phone', { required: 'Phone number is required' })}
            type="tel"
            placeholder="Only used when email isn't fast enough"
            className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none transition-colors duration-300 text-lg bg-transparent text-gray-900 placeholder-gray-400"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            {...register('country', { required: 'Please select your country' })}
            className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none transition-colors duration-300 text-lg bg-transparent text-gray-900 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            <option value="" disabled className="text-gray-400">
              Select your country
            </option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
            <option value="Brazil">Brazil</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Canada">Canada</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Colombia">Colombia</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Croatia">Croatia</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="Estonia">Estonia</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Greece">Greece</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Mexico">Mexico</option>
            <option value="Morocco">Morocco</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Norway">Norway</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Qatar">Qatar</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Serbia">Serbia</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Korea">South Korea</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Thailand">Thailand</option>
            <option value="Turkey">Turkey</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Other">Other</option>
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
          )}
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How did you hear about us?
          </label>
          <select
            {...register('heardAboutUs', { required: 'Please tell us how you heard about us' })}
            className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none transition-colors duration-300 text-lg bg-transparent text-gray-900 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            <option value="" disabled className="text-gray-400">
              Select an option
            </option>
            <option value="linkedin">LinkedIn</option>
            <option value="friend_referral">Friend referral</option>
            <option value="employee_referral">Referral by one of our employees</option>
            <option value="other_social">Other social platform</option>
            <option value="google_search">Google search</option>
            <option value="other">Other</option>
          </select>
          {errors.heardAboutUs && (
            <p className="text-red-500 text-sm mt-1">{errors.heardAboutUs.message}</p>
          )}
        </motion.div>

        <AnimatePresence>
          {heardAboutUs === 'other' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please specify
              </label>
              <input
                {...register('heardAboutUsOther', { 
                  required: heardAboutUs === 'other' ? 'Please specify how you heard about us' : false 
                })}
                type="text"
                placeholder="Tell us more..."
                className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none transition-colors duration-300 text-lg bg-transparent text-gray-900 placeholder-gray-400"
              />
              {errors.heardAboutUsOther && (
                <p className="text-red-500 text-sm mt-1">{errors.heardAboutUsOther.message}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
