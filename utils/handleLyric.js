export const handleLyric = (lyric) => {
  const TimeRgx = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  // const TimeRgx = /\d/
  const LyricArr = []
  lyric.split('\n').forEach(item => {
    const result = TimeRgx.exec(item)
    if(!result) return
    const millSecondresult3 = result[3].toString().length === 2 ? result[3].toString()+ 0  : result[3].toString()
    const millSecond = result[1]*60*1000 + result[2]*1000 + parseInt(millSecondresult3)
    LyricArr.push({[millSecond]:result['input'].split(']')[1]})
  })
  return LyricArr
}