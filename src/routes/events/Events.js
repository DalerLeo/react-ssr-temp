import loMap from 'lodash/map'
import loGet from 'lodash/get'
import React from 'react'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import Title from 'components/PageTitle'
import Container from 'components/Container'
import Link from 'components/Link'
import styles from './styles'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Image1 from 'images/news1.jpg'
import Image2 from 'images/news2.jpg'
import Image3 from 'images/news3.jpg'
import Image4 from 'images/news4.jpg'
import classNames from 'classnames'
import sprintf from 'sprintf'
import { EVENTS_ITEM_URL } from 'constants/routes'

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

const Events = ({ ...props }) => {
  const { classes } = props
  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.pageTitle}>
          <Title text={'Мероприятия и новости'}/>
        </div>
        <Row gutter={16} style={{ marginBottom: '129px' }}>
          {loMap(data, (item, index) => {
            const title = loGet(item, 'title')
            const text = loGet(item, 'text')
            const image = loGet(item, 'image')
            const link = loGet(item, 'link')
            return (
              <Col span={8}>
                <Link to={sprintf(EVENTS_ITEM_URL, index)} key={index} className={classes.itemWrapper}>
                  <div className={classes.item} style={{ backgroundImage: image
                    ? `url(${image})`
                    : 'none' }}>
                    <div className={classNames(classes.text, { [classes.link]: link })}>
                      <div className={classes.title}>{title}</div>
                      <div className={classes.description}>{text}</div>
                    </div>
                  </div>
                </Link>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default enhance(Events)
