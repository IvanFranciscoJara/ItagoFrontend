import React from 'react'

class IconDoubleCheck extends React.Component {
  render() {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 18 18'
        width='18'
        height='18'
        className={this.props.className}
      >
        <path
          fill='currentColor'
          d='M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z'
        ></path>
      </svg>
    )
  }
}

class IconSend extends React.Component {
  render() {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width='24'
        height='24'
        className={this.props.className}
      >
        <path
          fill='currentColor'
          d='M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z'
        ></path>
      </svg>
    )
  }
}

class IconMenu extends React.Component {
  render() {
    return (
      <svg
        aria-hidden='true'
        focusable='false'
        data-prefix='fas'
        data-icon='ellipsis-v'
        // class='svg-inline--fa fa-ellipsis-v fa-w-6'
        role='img'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 192 512'
        className={this.props.className}
        onClick={this.props.onClick}
      >
        <path
          fill='currentColor'
          d='M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z'
        ></path>
      </svg>
    )
  }
}

export { IconDoubleCheck, IconSend, IconMenu }
