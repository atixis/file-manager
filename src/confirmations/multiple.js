import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

const MultipleConfirmDeletion = (props) => {
  const {
    handleDeleteSubmit,
  } = props

  return (
    <Button className="deleting" color="danger" onClick={handleDeleteSubmit}>
      Confirm deletion
    </Button>
  )
}

MultipleConfirmDeletion.propTypes = {
  handleDeleteSubmit: PropTypes.func,
}

export default MultipleConfirmDeletion
