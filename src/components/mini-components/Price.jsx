const Price = ({ fullPrice, salePrice }) => {
  return (
    <div className='item__price'>
      {salePrice ? (
        <>
          <span className='item__price--normal'>${fullPrice}</span>${salePrice}
        </>
      ) : (
        <>${fullPrice}</>
      )}
    </div>
  )
}
export default Price
