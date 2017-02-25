import { Sector, LineDef, Vertex } from './objects'

export const map1 = [
    new Sector([
        new LineDef([
            new Vertex(20, 70),
            new Vertex(70, 70)
        ]),
        new LineDef([
            new Vertex(70, 70),
            new Vertex(70, 150)
        ])
    ], 0, 20)
]