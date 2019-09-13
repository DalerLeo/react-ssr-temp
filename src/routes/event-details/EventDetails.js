
import loGet from 'lodash/get'
import React from 'react'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import Container from 'components/Container'
import NewsFeed from 'components/HomePage/NewsFeed'
import styles from './styles'
import Image1 from 'images/news1.jpg'
import Image2 from 'images/news2.jpg'
import Image3 from 'images/news3.jpg'
import Image4 from 'images/news4.jpg'

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis libero urna, aliquet faucibus neque sollicitudin ac. Etiam vitae justo ipsum. Sed rhoncus volutpat dui sit amet tempor. Donec sed mollis justo, in eleifend elit. Nulla bibendum, sapien sit amet elementum fermentum, ex mi ultricies sapien, fringilla iaculis diam odio vitae neque. Aliquam sagittis tortor augue, vel feugiat quam eleifend convallis. Donec tempor risus nec sapien molestie, eu suscipit mi interdum. Suspendisse potenti. Integer fermentum pretium ligula, a placerat magna elementum et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Suspendisse et nisi ut dui pharetra faucibus. Vivamus efficitur lorem in lacinia vehicula. Etiam cursus massa dolor, vitae vehicula magna tristique ut. Sed ac tortor tristique, imperdiet enim eu, euismod nibh. Etiam non orci sapien. In gravida tempus felis nec vestibulum. Pellentesque vel condimentum nisi, a euismod libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at bibendum risus. Aenean sed leo libero. Nulla sed neque erat. Curabitur sit amet erat et est dignissim volutpat vitae nec mi. Proin luctus ex sit amet ante lobortis pretium. Aenean placerat eros in dictum rutrum. Pellentesque eros elit, pharetra ut pharetra eu, malesuada eleifend nibh.`

const data = [
  {
    title: 'Title',
    image: Image1,
    text: 'Non omnis. Nullam adipisicing. Earum nisi quisque praesent nonummy. Beatae sollicitudin eiusmod impedit laborum est accumsan, proin officiis, facilisi anim.'
  },
  {
    title: 'Title 2',
    image: Image2,
    link: true,
    text: 'Lacus earum ullam magnam veniam malesuada risus nullam, sagittis nam, tellus quisquam sequi nostrud ipsam accumsan, unde incididunt? Alias mi.'
  },
  {
    title: 'Title 3',
    image: Image3,
    text: 'Repellendus molestiae nemo saepe ducimus, ea a ullamco, eros at, imperdiet atque saepe dictumst numquam occaecati, fames potenti facilisi quam.'
  },
  {
    title: 'Title 4',
    image: Image4,
    text: 'Faucibus alias odio hic potenti mauris perspiciatis aliqua aut vero recusandae aenean sed, pariatur, nascetur, urna lorem, quos aperiam, dolores.'
  },
  {
    title: 'Title 2',
    image: Image2,
    link: true,
    text: 'Lacus earum ullam magnam veniam malesuada risus nullam, sagittis nam, tellus quisquam sequi nostrud ipsam accumsan, unde incididunt? Alias mi.'
  },
  {
    title: 'Title 3',
    image: Image3,
    text: 'Repellendus molestiae nemo saepe ducimus, ea a ullamco, eros at, imperdiet atque saepe dictumst numquam occaecati, fames potenti facilisi quam.'
  },
  {
    title: 'Title 2',
    image: Image2,
    link: true,
    text: 'Lacus earum ullam magnam veniam malesuada risus nullam, sagittis nam, tellus quisquam sequi nostrud ipsam accumsan, unde incididunt? Alias mi.'
  },
  {
    title: 'Title 3',
    image: Image3,
    text: 'Repellendus molestiae nemo saepe ducimus, ea a ullamco, eros at, imperdiet atque saepe dictumst numquam occaecati, fames potenti facilisi quam.'
  },
  {
    title: 'Title 4',
    image: Image4,
    text: 'Faucibus alias odio hic potenti mauris perspiciatis aliqua aut vero recusandae aenean sed, pariatur, nascetur, urna lorem, quos aperiam, dolores.'
  },
  {
    title: 'Title 4',
    image: Image4,
    text: 'Faucibus alias odio hic potenti mauris perspiciatis aliqua aut vero recusandae aenean sed, pariatur, nascetur, urna lorem, quos aperiam, dolores.'
  }
]

const enhance = compose(
  withState('openDialog', 'setOpenDialog', false),
  injectSheet(styles)
)

const EventDetails = ({ ...props }) => {
  const { classes, id } = props
  const image = loGet(data, [id, 'image'])

  return (
    <div className={classes.wrapper}>
      <div className={classes.imgWrapper}>
        <div style={{ backgroundImage: 'url(' + image + ')' }} alt=""/>

        <div>
          <span style={{ fontSize: '133px' }}>23.04.2018</span>
          <span>Lorem ipsum dolor sit amet</span>
        </div>
      </div>

      <Container>
        <div className={classes.button}><span>Регистрация</span></div>
        <div className={classes.text}>
          DALER
          {TEXT}
          <div className={classes.image}>
            <img className={classes.image} src={image} alt=""/>
          </div>
          {TEXT}
        </div>
      </Container>
      <NewsFeed/>
    </div>
  )
}

export default enhance(EventDetails)
