using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
public class PlayingMode : MonoBehaviour
{
    public GameObject numPlayer;
    public int num;

    public void Player()
    {
        numPlayer.GetComponent<NumPlayer>().num = num;
        SceneManager.LoadScene("onGame");
    }

}
