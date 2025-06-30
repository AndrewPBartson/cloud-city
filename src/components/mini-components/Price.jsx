const Price = ({ fullPrice, salePrice }) => {
  return (
    <div className='book__price'>
      {salePrice ? (
        <>
          <span className='book__price--normal'>${fullPrice}</span>${salePrice}
        </>
      ) : (
        <>${fullPrice}</>
      )}
    </div>
  )
}
export default Price
