import hexToRgb from 'helpers/hexToRgb'

export default {
  table: {
    overflow: 'hidden'
  },
  row: {
    background: '#fff',
    padding: '15px 30px 15px 20px',
    '&:nth-child(even)': {
      background: hexToRgb('#EEF1F6', '0.55')
    }
  },
  rowClickable: {
    cursor: 'pointer'
  },
  rowHeader: {
    color: hexToRgb('#000', '0.5'),
    fontWeight: '500'
  },
  column: {
    lineHeight: '24px'
  },
  columnRight: {
    textAlign: 'right'
  }
}
