import { Sector, LineDef, Vertex } from './objects'

export const map1 = [
    new Sector([
        new LineDef([
            new Vertex(20, 110),
            new Vertex(70, 110)
        ]),
        new LineDef([
            new Vertex(70, 110),
            new Vertex(70, 190)
        ])
    ], 0, 20)
]