import style from './BannerHome.module.css'

export default function BannerHome() {
  return (
    <div
      className={style.banner}
      style={{
        backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/orderscf-60400.appspot.com/o/other%2Fbanner-home.jpg?alt=media&token=343e363f-78f7-4094-ac75-cee3a3336a91")`,
        objectFit: 'cover',
      }}
    />
  )
}
