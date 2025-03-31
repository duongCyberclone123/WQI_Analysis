using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
public class Option : MonoBehaviour
{
    public void switchOption()
    {
        SceneManager.LoadScene("option");
    }

    public void playingOption(int number)
    {
        SceneManager.LoadScene("onGame");
    }

    public void Exit()
    {
        SceneManager.LoadScene("wait");
    }
}
