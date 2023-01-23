import yup from 'yup'

export const validatePublic = yup.object().shape({
  url: yup.string().trim().url().required(),
})
