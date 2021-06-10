var citiesData = require("../../../knowledgebase/cities.json")

export default function (req, res) {
  const { inputText } = req.query
  var rta = citiesData.filter(
    c => c.city.toLowerCase().indexOf(inputText.toLowerCase()) === 0
  )
  res.status(200).json({ data: rta.slice(0, 5) })
}
