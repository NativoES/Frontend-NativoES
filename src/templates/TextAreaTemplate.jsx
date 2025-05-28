'use client';

import React from 'react';
import PropTypes from 'prop-types';

export default function TextAreaTemplate({
  id,
  className = '',
  value,
  onChange,
  placeholder = '',
  ...props
}) {
  return (
    <textarea
      id={id}
      className={`p-2 border border-gray-300 rounded-md text-gray-900 w-full ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
}

TextAreaTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};