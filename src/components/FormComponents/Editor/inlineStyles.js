import React from 'react'

import FormatBold from 'react-icons/lib/md/format-bold'
import FormatItalic from 'react-icons/lib/md/format-italic'
import FormatUnderlined from 'react-icons/lib/md/format-underlined'

const INLINE_STYLES = [
  // ALL INLINE STYLES
  /*

    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'}

    */
  // NEEDED STYLES
  { label: <FormatBold />, style: 'BOLD' },
  { label: <FormatItalic />, style: 'ITALIC' },
  { label: <FormatUnderlined />, style: 'UNDERLINE' }
]

export default INLINE_STYLES
