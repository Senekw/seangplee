// Static image imports — Next generates width/height + a blur placeholder for
// each, giving us blur-up loading with zero layout shift. The optimizer serves
// AVIF/WebP automatically, so we import the source JPG/PNG only.
import approachConference from "@/public/images/approach-conference.jpg";
import approachLight from "@/public/images/approach-light.jpg";
import brainCanyon from "@/public/images/brain-canyon.jpg";
import ccfBadge from "@/public/images/ccf-badge.jpg";
import ccfBallroom from "@/public/images/ccf-ballroom.jpg";
import ccfPoster from "@/public/images/ccf-poster.jpg";
import communitySunset from "@/public/images/community-sunset.jpg";
import contactPersimmon from "@/public/images/contact-persimmon.jpg";
import experienceCanyon from "@/public/images/experience-canyon.jpg";
import heroRoses from "@/public/images/hero-roses.jpg";
import researchBrain from "@/public/images/research-brain.png";

export const images = {
  approachConference,
  approachLight,
  brainCanyon,
  ccfBadge,
  ccfBallroom,
  ccfPoster,
  communitySunset,
  contactPersimmon,
  experienceCanyon,
  heroRoses,
  researchBrain,
};

export type ImageKey = keyof typeof images;

/** Look up a static image by its content key. */
export const getImage = (key: string) => images[key as ImageKey];
