import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

const ConfirmDeletion = (props) => {
  const {
    children,
    handleDeleteSubmit,
    handleFileClick,
    url,
  } = props

  return (
    <form className="deleting" onSubmit={handleDeleteSubmit}>
      <a
        href={url}
        download="download"
        onClick={handleFileClick}
      >
        {children}
      </a>
      <div>
        <Button type="submit" color="danger">
          Confirm deletion
        </Button>
      </div>
    </form>
  )
}

ConfirmDeletion.propTypes = {
  children: PropTypes.node,
  handleDeleteSubmit: PropTypes.func,
  handleFileClick: PropTypes.func,
  url: PropTypes.string,
}

ConfirmDeletion.defaultProps = {
  url: '#',
}

export default ConfirmDeletion
