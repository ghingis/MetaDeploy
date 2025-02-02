import Tooltip from '@salesforce/design-system-react/components/tooltip';
import { t } from 'i18next';
import * as React from 'react';

import { getDuration } from '@/js/utils/dates';

const Intro = ({
  averageDuration,
  isProductionOrg,
  results,
  cta,
  preMessage,
  postMessage,
  backLink,
}: {
  averageDuration: string | null;
  isProductionOrg: boolean;
  results: React.ReactNode;
  cta: React.ReactNode;
  preMessage?: React.ReactNode;
  postMessage?: React.ReactNode;
  backLink?: React.ReactNode;
}) => {
  const duration = getDuration(averageDuration);
  return (
    <div
      className="slds-p-around_medium
        slds-size_1-of-1
        slds-medium-size_1-of-2"
    >
      <div className="slds-text-longform">
        {duration ? (
          <div className="slds-m-bottom_small">
            <strong>
              {t('Average Install Time: {{duration}}.', { duration })}
            </strong>
            {isProductionOrg ? (
              <Tooltip
                content={t(
                  'Install times in production orgs will vary depending on how many tests need to be run.',
                )}
                assistiveText={{ triggerLearnMoreIcon: 'Disclaimer' }}
                position="overflowBoundaryElement"
                triggerClassName="slds-p-left_xx-small"
              />
            ) : null}
          </div>
        ) : null}
        {preMessage}
        {results}
        {postMessage}
      </div>
      {cta}
      {backLink}
    </div>
  );
};

export default Intro;
