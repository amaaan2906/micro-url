/**
 * Yup validation object for URL validation
 */

import yup from 'yup'

export const validatePublic = yup.object().shape({
  url: yup.string().trim().url().required(),
})

export const validatePrivate = yup.object().shape({
  url: yup.string().trim().url().required(),
  slug: yup
    .string()
    .trim()
    .min(6)
    .matches(/^[\w\-]+$/i)
    .required(),
})
