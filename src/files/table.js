import React from 'react'
import ClassNames from 'classnames'
import { DragSource, DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import flow from 'lodash/flow'

import BaseFile, { BaseFileConnectors } from './../base-file.js'
import { fileSize } from './utils.js'

const isDate = (date) => {
  return (date instanceof Date)
}

const toDate = (date) => {
  if (date === undefined) {
    return new Date(0)
  }
  if (isDate(date)) {
    return date
  } else {
    return new Date(parseFloat(date.toString()))
  }
}

const formatDate = (date, format) => {
  const d = toDate(date)
  console.log('new : ', Moment(date).format('DD-MM-YYYY HH:MM:SS'))
  return format
    .replace(/Y/gm, d.getFullYear().toString())
    .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
    .replace(/d/gm, ('0' + (d.getDate() + 1)).substr(-2))
    .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
    .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
    .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
}

class RawTableFile extends BaseFile {
  render() {
    const {
      isDragging, isDeleting, isRenaming, isOver, isSelected,
      action, url, browserProps, connectDragPreview,
      depth, size, modified,
    } = this.props

    const icon = browserProps.icons[this.getFileType()] || browserProps.icons.File
    const inAction = (isDragging || action)

    const ConfirmDeletionRenderer = browserProps.confirmDeletionRenderer

    let name
    if (!inAction && isDeleting && browserProps.selection.length === 1) {
      name = (
        <ConfirmDeletionRenderer
          handleDeleteSubmit={this.handleDeleteSubmit}
          handleFileClick={this.handleFileClick}
          url={url}
        >
          {icon}
          {this.getName()}
        </ConfirmDeletionRenderer>
      )
    } else if (!inAction && isRenaming) {
      name = (
        <form className="renaming" onSubmit={this.handleRenameSubmit}>
          {icon}
          <input
            ref={this.selectFileNameFromRef}
            type="text"
            value={this.state.newName}
            onChange={this.handleNewNameChange}
            onBlur={this.handleRenameSubmit}
            autoFocus
          />
        </form>
      )
    } else {
      name = (
        <a
          href={url || '#'}
          download="download"
          onClick={this.handleFileClick}
        >
          {icon}
          {this.getName()}
        </a>
      )
    }

    let draggable = (
      <div>
        {name}
      </div>
    )
    if (typeof browserProps.moveFile === 'function') {
      draggable = connectDragPreview(draggable)
    }

    const row = (
      <tr
        className={ClassNames('file', {
          pending: action,
          dragging: isDragging,
          dragover: isOver,
          selected: isSelected,
        })}
        onClick={this.handleItemClick}
        onDoubleClick={this.handleItemDoubleClick}
      >
        <td className="name">
          <div style={{ paddingLeft: (depth * 16) + 'px' }}>
            {draggable}
          </div>
        </td>
        <td className="size">{fileSize(size)}</td>
        <td className="modified">
          {console.log(formatDate(modified, 'H:i:s d-m-Y'))}
          {typeof modified === 'undefined' ? '-' : formatDate(modified, 'H:i:s d-m-Y')}
        </td>
      </tr>
    )

    return this.connectDND(row)
  }
}

const TableFile = flow(
  DragSource('file', BaseFileConnectors.dragSource, BaseFileConnectors.dragCollect),
  DropTarget(['file', 'folder', NativeTypes.FILE], BaseFileConnectors.targetSource, BaseFileConnectors.targetCollect)
)(RawTableFile)

export default TableFile
export { RawTableFile }
