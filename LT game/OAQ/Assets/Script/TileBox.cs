using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TileBox : MonoBehaviour
{
    [SerializeField] private Sprite villager;
    [SerializeField] private Sprite official;
    private PlayingMode screen;
    private MainCam mainCam;

    private void Awake()
    {
        screen = UnityEngine.Object.FindObjectOfType<PlayingMode>() as PlayingMode;
        mainCam = UnityEngine.Object.FindObjectOfType<MainCam>() as MainCam;
    }
}
