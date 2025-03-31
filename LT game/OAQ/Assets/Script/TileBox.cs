using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TileBox : MonoBehaviour
{
    private int inTurn;
    [SerializeField] private Sprite villager;
    [SerializeField] private Sprite official;
    private PlayingMode screen;
    private MainCam mainCam;

    private void Awake()
    {
        screen = UnityEngine.Object.FindObjectOfType<PlayingMode>() as PlayingMode;
        mainCam = UnityEngine.Object.FindObjectOfType<MainCam>() as MainCam;
    }

    private void Start()
    {
        inTurn = 0;

    }

    /*private void Init()
    {
        for (int i = 0; i < 12; i++)
        {
            Vector2 pos = mainCam.getTile(i).transform.position;
            float width = mainCam.getTile(i).GetComponent<SpriteRenderer>().bounds.size.x;
            float height = mainCam.getTile(i).GetComponent<SpriteRenderer>().bounds.size.y;
            if (i == 5 || i == 11)
            {

            }
        }
    }*/
}
