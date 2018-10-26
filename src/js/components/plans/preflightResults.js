// @flow

import * as React from 'react';
import Icon from '@salesforce/design-system-react/components/icon';

import type {
  Preflight as PreflightType,
  PreflightError as PreflightErrorType,
} from 'plans/reducer';

const ErrorIcon = (): React.Node => (
  <Icon
    assistiveText={{ label: 'Error' }}
    category="utility"
    name="error"
    colorVariant="error"
    size="x-small"
    className="slds-m-bottom_xxx-small"
    containerClassName="slds-m-right_x-small"
  />
);

const WarningIcon = (): React.Node => (
  <Icon
    assistiveText={{ label: 'Warning' }}
    category="utility"
    name="warning"
    colorVariant="warning"
    size="x-small"
    className="slds-m-bottom_xxx-small"
    containerClassName="slds-m-right_x-small"
  />
);

export const PlanErrors = ({
  errorList,
}: {
  errorList: Array<PreflightErrorType>,
}): React.Node => (
  <ul className="plan-error-list">
    {errorList.map((err, idx) => {
      if (!err.message) {
        return null;
      }
      switch (err.status) {
        case 'error':
          return (
            <li key={idx}>
              <ErrorIcon />
              {/* @@@ Is this a good idea? */}
              <span
                className="slds-text-color_error"
                dangerouslySetInnerHTML={{ __html: err.message }}
              />
            </li>
          );
        case 'warn':
          return (
            <li key={idx}>
              <WarningIcon />
              {/* @@@ Is this a good idea? */}
              <span dangerouslySetInnerHTML={{ __html: err.message }} />
            </li>
          );
      }
      return null;
    })}
  </ul>
);

const PreflightResults = ({
  preflight,
}: {
  preflight: PreflightType,
}): React.Node => {
  if (preflight.status !== 'complete' && preflight.status !== 'failed') {
    return null;
  }

  if (preflight.has_errors || preflight.status === 'failed') {
    let errorCount = 0;
    let warningCount = 0;
    if (preflight.results) {
      for (const key of Object.keys(preflight.results)) {
        if (Array.isArray(preflight.results[key])) {
          for (const err of preflight.results[key]) {
            switch (err.status) {
              case 'error':
                errorCount = errorCount + 1;
                break;
              case 'warn':
                warningCount = warningCount + 1;
                break;
            }
          }
        }
      }
    }
    let msg = 'errors';
    const errorMsg = `${errorCount} error${errorCount === 1 ? '' : 's'}`;
    const warningMsg = `${warningCount} warning${
      warningCount === 1 ? '' : 's'
    }`;
    if (errorCount > 0 && warningCount > 0) {
      msg = `${errorMsg} and ${warningMsg}`;
    } else if (errorCount > 0) {
      msg = errorMsg;
    } else if (warningCount > 0) {
      msg = warningMsg;
    }
    const isError = errorCount > 0 || preflight.status === 'failed';
    return (
      <>
        <p className={isError ? 'slds-text-color_error' : ''}>
          {isError ? <ErrorIcon /> : <WarningIcon />}
          Pre-install validation found {msg}.
        </p>
        {isError ? (
          <p>
            After resolving all errors, run the pre-install validation again.
          </p>
        ) : null}
        {preflight.results &&
        preflight.results.plan &&
        preflight.results.plan.length ? (
          <PlanErrors errorList={preflight.results.plan} />
        ) : null}
      </>
    );
  }

  if (preflight.is_valid) {
    return (
      <p className="slds-text-color_success">
        Pre-install validation completed successfully.
      </p>
    );
  }

  return (
    <p>
      <WarningIcon />
      Pre-install validation has expired; please run it again.
    </p>
  );
};

export default PreflightResults;
