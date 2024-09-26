export const EmailTemplates = {
  PHISHING: 'phishing' as const,
} as const;

export const TemplatesMetadata = {
  [EmailTemplates.PHISHING]: {
    subject: 'Very attractive link!!',
    templateSrc: '../../../email-templates/phishing.hbs',
  },
};

export type ContextArgumentsType = {
  [EmailTemplates.PHISHING]: {
    phishingLink: string;
  };
};
