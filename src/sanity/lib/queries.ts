import { groq } from 'next-sanity'

export const getAboutQuery = groq`*[_type == "about"][0]{
  name,
  role,
  tagline,
  bio,
  "profileImage": profileImage.asset->url,
  resumeUrl,
  location,
  email,
  socials
}`

export const getProjectsQuery = groq`*[_type == "project"] | order(order asc){
  _id,
  title,
  subtitle,
  status,
  "slug": slug.current,
  description,
  "coverImage": coverImage.asset->url,
  technologies,
  liveUrl,
  githubUrl,
  featured
}`

export const getSkillsQuery = groq`*[_type == "skill"] | order(order asc){
  _id,
  name,
  category,
  icon
}`

export const getExperienceQuery = groq`*[_type == "experience"] | order(order asc){
  _id,
  role,
  company,
  location,
  startDate,
  current,
  endDate,
  description
}`

export const getBlogsQuery = groq`*[_type == "blog"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "mainImage": mainImage.asset->url
}`

export const getTestimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc){
  _id,
  name,
  role,
  company,
  quote,
  "image": image.asset->url
}`
