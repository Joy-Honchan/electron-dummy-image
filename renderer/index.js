document.forms[0].addEventListener('submit', generatePicture)
function generatePicture(e) {
  e.preventDefault()
  const width = document.getElementById('width').value
  const height = document.getElementById('height').value
  const fontSize = document.getElementById('fontSize').value
  if (width.lengh === 0 || height.length === 0 || fontSize.length === 0) {
    return
  }
  //   const cavasResult = (
  //     <canvas id="dummy-img" width={`${width}`} height={`${height}`}></canvas>
  //   )
  const cavasResult = document.getElementById('myCanvas')
  cavasResult.width = width
  cavasResult.height = height

  const ctx = cavasResult.getContext('2d')
  //   ctx.fillStyle = '#bab9b6'
  //   ctx.fillRect(0, 0, width, height)
  ctx.font = `${fontSize}px Arial`
  ctx.textAlign = 'center'
  ctx.fillText(`${width} X ${height}`, width / 2, height / 2)
  ctx.fillStyle = 'black'
  //
  document.getElementById('downloadBtn').style.display = 'inline-block'
}

function downloadImg() {}
